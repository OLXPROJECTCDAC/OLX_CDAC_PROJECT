package com.olx.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.olx.entities.PackageIdEntity;

public interface PackageIdDao extends JpaRepository<PackageIdEntity, Integer>{
	PackageIdEntity findByPackageId(int packageId);
	boolean existsByPackageId(int packageId);

}
