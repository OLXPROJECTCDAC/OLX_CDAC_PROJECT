package com.olx.controller;
import com.olx.dto.ApiResponse;
import com.olx.entities.CategoryEntity;
import com.olx.service.CategoryService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/categories")
@CrossOrigin
@AllArgsConstructor
public class CategoryController {
	@Autowired
	private CategoryService categoryService;
	
	@GetMapping
	public List<CategoryEntity> getAllCategories(){
		return categoryService.getAllCategory();
	}
    
	@GetMapping("/{id}")
	public CategoryEntity getCategoryById(@PathVariable int id ) {
		return categoryService.getCategoryDatails(id);
	}
	
	@PostMapping
	public ApiResponse createCategory(@RequestBody CategoryEntity category) {
		return categoryService.addNewCategory(category);
	}
	
	@PutMapping("/{id}")
	public String updateCategory(@PathVariable int id , @RequestBody CategoryEntity category) {
		return categoryService.updateCategory(id, category);
	}
	
	@DeleteMapping("/{id}")
	public String deleteCategory(@PathVariable int id) {
		return categoryService.deleteCategoryDetails(id);
	}
}
