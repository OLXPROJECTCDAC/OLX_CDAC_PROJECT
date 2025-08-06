// File: src/main/java/com/olx/service/impl/CategoryServiceImpl.java
package com.olx.service.impl;

import com.olx.dto.CategoryDto;
import com.olx.entity.Category;
import jakarta.persistence.EntityNotFoundException;
import com.olx.repository.CategoryRepository;
import com.olx.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository repository;

    public CategoryServiceImpl(CategoryRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        return repository.findAll()
            .stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    }

    @Override
    public CategoryDto getCategoryById(Long id) {
        Category cat = repository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Category not found with id " + id));
        return toDto(cat);
    }

    @Override
    public CategoryDto createCategory(CategoryDto dto) {
        Category saved = repository.save(new Category(dto.getName()));
        return toDto(saved);
    }

    @Override
    public CategoryDto updateCategory(Long id, CategoryDto dto) {
        Category cat = repository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Category not found with id " + id));
        cat.setName(dto.getName());
        return toDto(repository.save(cat));
    }

    @Override
    public void deleteCategory(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Category not found with id " + id);
        }
        repository.deleteById(id);
    }

    private CategoryDto toDto(Category c) {
        CategoryDto dto = new CategoryDto();
        dto.setId(c.getId());
        dto.setName(c.getName());
        return dto;
    }
}