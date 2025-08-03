package com.olx.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.olx.dao.PackageIdDao;
import com.olx.dto.ApiResponse;
import com.olx.entities.PackageIdEntity;
import com.olx.exception.ApiException;
import com.olx.exception.ResourceNotFoundException;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class PackageIdServiceImpl implements PackageIdService{
	@Autowired
	private PackageIdDao packageIdDao;
	public PackageIdServiceImpl() {
		System.out.println("In constructor of "+getClass());
	}

	@Override
	public List<PackageIdEntity> getAllPackage() {
		return packageIdDao.findAll();
	}

	@Override
	public String deletePackage(int packageId) {
		if(packageIdDao.existsById(packageId)) {
			packageIdDao.deleteById(packageId);
			return "Package detelted successfully";
		}
		else
		return "Package not found "+packageId;
	}

	@Override
	public PackageIdEntity getPackageDetails(int id) {
		return packageIdDao.findById(id)
				.orElseThrow(() ->
				new ResourceNotFoundException("Invalid package id "));
	}

	@Override
	public ApiResponse addnewPackage(PackageIdEntity newPackage) {
		if(packageIdDao.existsByPackageId(newPackage.getPackageId()))
			throw new ApiException("Duplicate Package name !");
		newPackage.setStillActive(true);
		PackageIdEntity persiPackageIdEntity = packageIdDao.save(newPackage);
		return 
				new ApiResponse("Added new Package with id  = "+persiPackageIdEntity.getPackageId());
	}

	@Override
	public String updatePackage(int id, PackageIdEntity packageid) {
		if(packageIdDao.existsById(id)) {
			packageIdDao.save(packageid);
			return "Package detail updated !";
		}
		return "Invalid Package id";
	}

}
