package com.olx.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name ="PackageID")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class PackageIdEntity {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int packageId;
@Column(unique = true)
private int userId;
private boolean stillActive;
public PackageIdEntity(int packageId, int userId) {
	super();
	this.packageId = packageId;
	this.userId = userId;
	this.stillActive=true;
}
//@OneToOne
//@JoinColumn(name ="userId",referencedColumnName = "userId",unique = true)
//private UserEntity user;
}
