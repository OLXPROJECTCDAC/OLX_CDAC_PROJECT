package com.olx.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.olx.Enum.ReportCategory;
import com.olx.Enum.ReportStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReportResponseDTO extends BaseDTO {

    private Long productId;
    private ReportCategory reportCategory;
    private ReportStatus reportStatus;
    private String complaintText;
    private boolean isResolved;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime resolvedAt;

}
