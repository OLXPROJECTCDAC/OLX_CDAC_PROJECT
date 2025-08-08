package com.olx.service;

import com.olx.Enum.ReportStatus;
import com.olx.dto.ReportRequestDTO;
import com.olx.dto.ReportResponseDTO;
import com.olx.entity.ProductsEntity;
import com.olx.entity.ReportEntity;
import com.olx.exception.ResourceNotFoundException;
import com.olx.repository.ProductRepository;
import com.olx.repository.ReportRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    //dependency
    private final ReportRepository reportRepository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;


    // =================== Filing report received from user for specific product =====================
    @Override
    public void fileReport(ReportRequestDTO reportDTO) {

        // Fetch product by ID or throw exception if not found
        ProductsEntity product = productRepository.findById(reportDTO.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        // Create and populate report entity
        ReportEntity report = new ReportEntity();

        report.setProduct(product); // Setting the associated product for the report
        report.setReportCategory(reportDTO.getReportCategory());
        report.setReportStatus(ReportStatus.PENDING); //initial status -> as PENDING
        report.setComplaintText(reportDTO.getComplaintText());
        report.setIsResolved(false);

        reportRepository.save(report);
    }


    // =========================== Getting all the reports ===================================
    @Override
    public List<ReportResponseDTO> getAllReports() {
        return reportRepository.findAll()
                .stream()
                .map(report -> modelMapper.map(report, ReportResponseDTO.class))
//"For each report in the list of reports, send it into ModelMapper, which will create and return a ReportResponseDTO."
                .collect(Collectors.toList());
    }


    // =========================== Getting reports by Status ===================================
    @Override
    public List<ReportResponseDTO> getReportsByStatus(ReportStatus status) {

        List<ReportEntity> reports;
        if (status == null) {
            reports = reportRepository.findAll();
        } else {
            reports = reportRepository.findByReportStatus(status);


        }

//        return reports.stream()
//                .map(report -> modelMapper.map(report, ReportResponseDTO.class))
//                .collect(Collectors.toList());
        return reportRepository.findAll().stream()
                .map(report -> {
                    ReportResponseDTO dto = modelMapper.map(report, ReportResponseDTO.class);
                    dto.setProductId(report.getProduct().getId());
                    return dto;
                })
                .toList();
    }

    // =========================== Marking reports as resolved ===================================
    @Override
    public ReportResponseDTO updateStatus(Long reportId, ReportStatus newReportStatus) {
// Fetch the report by ID or throw an exception if not found
        ReportEntity report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not Found"));

        report.setReportStatus(newReportStatus); // Update the report status

        if (newReportStatus == ReportStatus.RESOLVED) {
            report.setIsResolved(true);
//            report.setResolvedAt(LocalDateTime.now());

        } else {
            report.setIsResolved(false);
//            report.setResolvedAt(null);
        }
        reportRepository.save(report);

        return modelMapper.map(report, ReportResponseDTO.class);
    }


}
