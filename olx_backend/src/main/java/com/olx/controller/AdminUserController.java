package com.olx.controller;


import com.olx.dto.ReportResponseDTO;
import com.olx.dto.UserRespDTO;
import com.olx.service.ProductService;
import com.olx.service.ReportService;
import com.olx.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/users")
@AllArgsConstructor
@Validated
public class AdminUserController {

    //dependency
    private final ReportService reportService;
    private final UserService userService;
    private final ProductService productService;



}
