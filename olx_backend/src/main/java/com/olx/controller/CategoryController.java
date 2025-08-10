package com.olx.controller;

import com.olx.dto.CategoryResDTO;
import com.olx.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categories") // Correctly defines the base path for all methods in this class
@RequiredArgsConstructor
@Validated
public class CategoryController {

    private final CategoryService categoryService;

    /**
     * Lists categories (paged) - for catalogue pages.
     * URL: GET http://host:port/categories
     */
    @GetMapping
    public ResponseEntity<Page<CategoryResDTO>> listCategories(
            @PageableDefault(size = 20) Pageable pageable) {
        Page<CategoryResDTO> page = categoryService.listCategories(pageable);
        return ResponseEntity.ok(page);
    }

    /**
     * Gets category details by ID.
     * URL: GET http://host:port/categories/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResDTO> getCategory(@PathVariable Long id) {
        CategoryResDTO dto = categoryService.getCategoryById(id);
        return ResponseEntity.ok(dto);
    }

    /**
     * Lists all categories (non-paged) - useful for dropdowns.
     * URL: GET http://host:port/categories/all
     */
    @GetMapping("/all")
    public ResponseEntity<List<CategoryResDTO>> listAllCategories() {
        List<CategoryResDTO> list = categoryService.listAllCategories();
        return ResponseEntity.ok(list);
    }

    /**
     * Searches categories by partial name.
     * URL: GET http://host:port/categories/search?q=keyword
     */
    @GetMapping("/search")
    public ResponseEntity<List<CategoryResDTO>> searchCategories(
            @RequestParam(value = "q", required = false) String keyword) {
        List<CategoryResDTO> results = categoryService.searchCategoriesByName(keyword);
        return ResponseEntity.ok(results);
    }
}
