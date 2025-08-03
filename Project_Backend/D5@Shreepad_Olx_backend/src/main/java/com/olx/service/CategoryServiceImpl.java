package com.olx.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.olx.dao.CategoryDao;
import com.olx.dto.ApiResponse;
import com.olx.entities.CategoryEntity;
import com.olx.exception.ApiException;
import com.olx.exception.ResourceNotFoundException;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
@Service
@Transactional
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
    private CategoryDao categoryDao;
	public CategoryServiceImpl() {
		System.out.println("In constructor of "+getClass());
	}
	@Override
	public List<CategoryEntity> getAllCategory() {
		return categoryDao.findAll();
	}

	@Override
	public String deleteCategoryDetails(int categoryId) {
		if(categoryDao.existsById(categoryId)) {
			categoryDao.deleteById(categoryId);
			return "Category deleted successfully";
		}
		else
		return "Category not found by id "+categoryId;
	}

	@Override
	public CategoryEntity getCategoryDatails(int id) {
		return categoryDao.findById(id)
				.orElseThrow(() -> 
				new ResourceNotFoundException("Invalid Category id"));
	}

	@Override
	public String updateCategory(int id, CategoryEntity category) {
		if(categoryDao.existsById(id)) {
			categoryDao.save(category);
			return "Category detail updated !";
		}
		return "Invalid category id !";
	}

	@Override
	public ApiResponse addNewCategory(CategoryEntity newCategory) {
		if(categoryDao.existsByCategoryName(newCategory.getCategoryName()))
			throw new ApiException("Duplicate category name!");
		newCategory.setStatus(true);
		CategoryEntity persistentCategory = categoryDao.save(newCategory);
		return 
				new ApiResponse("Added new Category with id = "+persistentCategory.getCategoryId());
	}

}
