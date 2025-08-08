package com.olx.controller;

import com.olx.dto.CategoryRequestDTO;
import com.olx.dto.CategoryResDTO;
import com.olx.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/admin/categories") // <-- CRITICAL FIX: This was missing
@RequiredArgsConstructor // Using @RequiredArgsConstructor is cleaner than @AllArgsConstructor
@Validated
public class AdminCategoryController {

    private final CategoryService categoryService;

    /**
     * Creates a new category (admin only).
     * URL: POST http://host:port/admin/categories
     */
    @PostMapping
    public ResponseEntity<CategoryResDTO> createCategory(@Valid @RequestBody CategoryRequestDTO dto) {
        CategoryResDTO created = categoryService.createCategory(dto);
        // This location now correctly matches the GET endpoint below
        URI location = URI.create(String.format("/admin/categories/%d", created.getId()));
        return ResponseEntity.created(location).body(created);
    }

    /**
     * Lists all categories (paged) for admin view.
     * URL: GET http://host:port/admin/categories
     */
    @GetMapping
    public ResponseEntity<Page<CategoryResDTO>> listCategories(@PageableDefault(size = 20) Pageable pageable) {
        Page<CategoryResDTO> page = categoryService.listCategories(pageable);
        return ResponseEntity.ok(page);
    }

    /**
     * Gets a category by ID for admin view.
     * URL: GET http://host:port/admin/categories/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResDTO> getCategory(@PathVariable Long id) {
        CategoryResDTO dto = categoryService.getCategoryById(id);
        return ResponseEntity.ok(dto);
    }

    /**
     * Updates a category by ID (admin only).
     * URL: PUT http://host:port/admin/categories/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<CategoryResDTO> updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody CategoryRequestDTO dto) {
        CategoryResDTO updated = categoryService.updateCategory(id, dto);
        return ResponseEntity.ok(updated);
    }

    /**
     * Soft-deletes a category by ID (admin only).
     * URL: DELETE http://host:port/admin/categories/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<CategoryResDTO> deleteCategory(@PathVariable Long id) {
        CategoryResDTO deleted = categoryService.deleteCategory(id);
        return ResponseEntity.ok(deleted);
    }
}