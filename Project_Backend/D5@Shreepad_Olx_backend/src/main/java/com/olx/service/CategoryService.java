package com.olx.service;
import java.util.List;

import com.olx.dto.ApiResponse;
import com.olx.entities.CategoryEntity;
public interface CategoryService {
	List<CategoryEntity> getAllCategory();
    String deleteCategoryDetails(int categoryId);
    CategoryEntity getCategoryDatails(int id);
    String updateCategory(int id,CategoryEntity category);
    ApiResponse addNewCategory(CategoryEntity newCategory);
}
