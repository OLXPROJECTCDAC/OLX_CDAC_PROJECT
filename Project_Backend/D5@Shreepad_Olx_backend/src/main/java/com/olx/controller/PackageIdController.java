package com.olx.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.olx.dto.ApiResponse;
import com.olx.entities.PackageIdEntity;
import com.olx.service.PackageIdService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/packageId")
@CrossOrigin
@AllArgsConstructor
public class PackageIdController {
	@Autowired
	private PackageIdService packageIdService;
	
	@GetMapping
	public List<PackageIdEntity> getAllPackage(){
		return packageIdService.getAllPackage();
	}
	
	@GetMapping("/{id}")
	public PackageIdEntity getPackageById(@PathVariable int id) {
		return packageIdService.getPackageDetails(id);
	}
    
	@PostMapping
	public ApiResponse createPackage(@RequestBody PackageIdEntity packageIdEntity) {
		return packageIdService.addnewPackage(packageIdEntity);
	}
	
	@PutMapping("/{id}")
	public String updatePackage(@PathVariable int id, @RequestBody PackageIdEntity packageIdEntity) {
		return packageIdService.updatePackage(id, packageIdEntity);
	}
	
	@DeleteMapping("/{id}")
	public String deletePackage(@PathVariable int id) {
		return packageIdService.deletePackage(id);
	}
	
}
