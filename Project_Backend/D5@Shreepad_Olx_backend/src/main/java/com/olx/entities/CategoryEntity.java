package com.olx.entities;

import java.util.ArrayList;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Category")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class CategoryEntity {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int categoryId;
@Column(length = 20, unique = true)
private String categoryName;
@Column(length = 100)
private String description;
private boolean status;


public CategoryEntity(int categoryId, String categoryName, String description) {
	//super();
	this.categoryId = categoryId;
	this.categoryName = categoryName;
	this.description = description;
	this.status=true;
}
//@OneToMany(mappedBy = "Category",cascade = CascadeType.ALL,orphanRemoval = true)
//@ToString.Exclude
//private List<Product> products = new ArrayList<>();

}
