package com.olx.service;

import java.util.List;

import com.olx.dto.ApiResponse;
import com.olx.entities.PackageIdEntity;

public interface PackageIdService {
List<PackageIdEntity> getAllPackage();
String deletePackage(int packageId);
PackageIdEntity getPackageDetails(int id);
String updatePackage(int id, PackageIdEntity packageid);
ApiResponse addnewPackage(PackageIdEntity newPackage);
}
