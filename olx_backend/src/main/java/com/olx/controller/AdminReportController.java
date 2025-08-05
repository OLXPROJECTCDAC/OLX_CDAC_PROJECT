package com.olx.controller;

import com.olx.Enum.ReportStatus;
import com.olx.dto.ReportResponseDTO;
import com.olx.dto.ReportStatusUpdateDTO;
import com.olx.service.ProductService;
import com.olx.service.ReportService;
import com.olx.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/reports")
@AllArgsConstructor
@Validated
public class AdminReportController {

    //dependency
    private final ReportService reportService;
    private final UserService userService;
    private final ProductService productService;


/* ---------------------------------------------------------------------------------------------
     Fetch All Reports OR Reports by Status
     URL - http://host:port/admin/reports?status=PENDING / RESOLVED / IN_REVIEW
     Method - GET
     Params / Payload - status=[PENDING, RESOLVED, IN_REVIEW]
     Response - List<ReportResponseDTO>
 */
@GetMapping
public ResponseEntity<List<ReportResponseDTO>> getReports(
        @RequestParam(value = "status", required = false) ReportStatus status) {
// @RequestParam --> Expect a query parameter from the HTTP request URL, which is optional, w/ value as status
    List<ReportResponseDTO> reports;

// If no status is provided, fetch all reports
    if (status == null) {
        reports = reportService.getAllReports();
// If a status is provided, fetch only the reports matching that status
    } else {
        reports = reportService.getReportsByStatus(status);
    }


    return ResponseEntity.ok(reports); // Return reports list - HTTP response w/ status - 200 OK
}



/* ---------------------------------------------------------------------------------------------
     Set Report Status
     URL - http://host:port/admin/reports/{id}
     Method - PUT
     Payload - Report Status + Product Id
     Response - String / ReportResponseDTO
 */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateReportStatus(
            @PathVariable Long id, @RequestBody ReportStatusUpdateDTO dto) {
        reportService.updateStatus(id, dto.getReportStatus());

        return ResponseEntity.ok().build();
    }

}
