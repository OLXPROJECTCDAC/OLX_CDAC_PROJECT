package com.olx.service;

import com.olx.dto.CategoryRequestDTO;
import com.olx.dto.CategoryResDTO;
import com.olx.entity.CategoryEntity;
import com.olx.exception.ApiException;
import com.olx.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    @Override
    public CategoryResDTO createCategory(CategoryRequestDTO dto) {
        // Using the corrected repository method
        if (categoryRepository.existsByCategoryName(dto.getCategoryName())) {
            throw new ApiException("Category with this name already exists");
        }
        CategoryEntity entity = modelMapper.map(dto, CategoryEntity.class);
        CategoryEntity saved = categoryRepository.save(entity);
        return toDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryResDTO getCategoryById(Long id) {
        CategoryEntity entity = categoryRepository.findById(id)
                .orElseThrow(() -> new ApiException("Category not found with id " + id));
        return toDto(entity);
    }

    @Override
    public CategoryResDTO updateCategory(Long id, CategoryRequestDTO dto) {
        CategoryEntity existing = categoryRepository.findById(id)
                .orElseThrow(() -> new ApiException("Category not found with id " + id));

        String newName = dto.getCategoryName();
        // Check if the name is being updated to a new, non-blank value
        if (newName != null && !newName.trim().isEmpty() && !newName.equalsIgnoreCase(existing.getCategoryName())) {
            // Using the corrected repository method
            if (categoryRepository.existsByCategoryName(newName.trim())) {
                throw new ApiException("Another category with this name already exists");
            }
            existing.setCategoryName(newName.trim());
        }

        // Allow categoryDetails to be updated even if it's null or empty
        existing.setCategoryDetails(dto.getCategoryDetails());

        CategoryEntity saved = categoryRepository.save(existing);
        return toDto(saved);
    }

    @Override
    public CategoryResDTO deleteCategory(Long id) {
        CategoryEntity category = categoryRepository.findById(id)
                .orElseThrow(() -> new ApiException("Category not found with id " + id));
        category.setActive(false);
        CategoryEntity saved = categoryRepository.save(category);
        // Using the helper method for consistency
        return toDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CategoryResDTO> listCategories(Pageable pageable) {
        return categoryRepository.findAll(pageable).map(this::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResDTO> listAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResDTO> searchCategoriesByName(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return List.of();
        }
        // Using the corrected repository method
        return categoryRepository.findByCategoryNameContainingIgnoreCase(keyword.trim())
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Private helper method to map an entity to a DTO.
     */
    private CategoryResDTO toDto(CategoryEntity entity) {
        if (entity == null) {
            return null;
        }
        return modelMapper.map(entity, CategoryResDTO.class);
    }
}