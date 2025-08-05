package com.olx.controller;

import com.olx.dto.ReportRequestDTO;
import com.olx.service.ProductService;
import com.olx.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    //dependecy
    private final ProductService productService;
    private final ReportService reportService;





    /*
    Report a product
    URL     - POST /products/{productId}/report
    Method  - POST
    Payload - JSON body (ReportRequestDTO)
    Response - Success message or ReportResponseDTO
*/

    @PostMapping("/{productId}/report")
    public ResponseEntity<String> reportProduct(
            @PathVariable Long productId,
            @RequestBody ReportRequestDTO reportDTO) {

        reportDTO.setProductId(productId);
        reportService.fileReport(reportDTO);
        return ResponseEntity.ok("Product reported successfully.");
    }

}
