package com.olx.service;

import com.olx.dto.CategoryRequestDTO;
import com.olx.dto.CategoryResDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {

    /**
     * Creates a new category.
     * @param dto The DTO containing category details.
     * @return The created category as a DTO.
     */
    CategoryResDTO createCategory(CategoryRequestDTO dto);

    /**
     * Retrieves a category by its unique ID.
     * @param id The ID of the category.
     * @return The found category as a DTO.
     */
    CategoryResDTO getCategoryById(Long id);

    /**
     * Updates an existing category.
     * @param id The ID of the category to update.
     * @param dto The DTO with the new details.
     * @return The updated category as a DTO.
     */
    CategoryResDTO updateCategory(Long id, CategoryRequestDTO dto);

    /**
     * Performs a soft delete on a category by setting its 'active' flag to false.
     * @param id The ID of the category to delete.
     * @return The category with its updated 'active' status.
     */
    CategoryResDTO deleteCategory(Long id);

    /**
     * Returns a paginated list of all categories.
     * @param pageable Pagination information.
     * @return A page of category DTOs.
     */
    Page<CategoryResDTO> listCategories(Pageable pageable);

    /**
     * Returns a complete, non-paginated list of all categories.
     * @return A list of all category DTOs.
     */
    List<CategoryResDTO> listAllCategories();

    /**
     * Searches for categories by a keyword in their name.
     * @param keyword The search term.
     * @return A list of matching category DTOs.
     */
    List<CategoryResDTO> searchCategoriesByName(String keyword);

}