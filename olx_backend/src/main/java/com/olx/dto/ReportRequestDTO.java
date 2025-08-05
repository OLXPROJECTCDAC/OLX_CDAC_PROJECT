package com.olx.dto;

import com.olx.Enum.ReportCategory;
import com.olx.Enum.ReportStatus;
import com.olx.entity.ProductsEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ReportRequestDTO {
    private Long ProductId;
    private ReportCategory reportCategory;
    private ReportStatus reportStatus;
    private String complaintText;
    private boolean isResolved;
    private LocalDateTime resolvedAt;
}

