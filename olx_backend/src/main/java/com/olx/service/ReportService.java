package com.olx.service;

import com.olx.Enum.ReportStatus;
import com.olx.dto.ReportRequestDTO;
import com.olx.dto.ReportResponseDTO;

import java.util.List;

public interface ReportService {
    void fileReport(ReportRequestDTO reportDTO);

    List<ReportResponseDTO> getAllReports();

    List<ReportResponseDTO> getReportsByStatus(ReportStatus status);

    ReportResponseDTO updateStatus(Long reportId, ReportStatus newReportStatus);
}
