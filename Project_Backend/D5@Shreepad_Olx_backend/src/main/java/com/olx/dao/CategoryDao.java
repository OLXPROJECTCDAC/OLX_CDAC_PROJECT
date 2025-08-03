package com.olx.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.olx.entities.CategoryEntity;

public interface CategoryDao extends JpaRepository<CategoryEntity, Integer>{
	CategoryEntity findByCategoryName(String CategoryName);
	boolean existsByCategoryName(String categoryName);
  
}
