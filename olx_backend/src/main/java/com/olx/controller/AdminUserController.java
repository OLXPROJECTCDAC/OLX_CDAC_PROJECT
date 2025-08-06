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

/* ---------------------------------------------------------------------------------------------
     Fetch All Users
     URL - http://host:port/admin/users
     Method - GET
     Params / Payload - none
     Response - List<UserRespDTO>
 */
//    @GetMapping
//    public ResponseEntity<List<UserRespDTO>> getUsers() {
//        List<UserRespDTO> users; // = UserService.getAllUsers()
//
//        return ResponseEntity.ok(users);
//    }


}
