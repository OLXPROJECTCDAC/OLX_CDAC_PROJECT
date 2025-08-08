package com.olx.dto;

import com.olx.Enum.ReportCategory;
import com.olx.Enum.ReportStatus;
import com.olx.entity.ProductsEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ReportRequestDTO {

    @NotNull
    private Long productId;

    @NotNull
    private ReportCategory reportCategory;

    @NotBlank(message = "Complaint text cannot be empty.")
    private String complaintText;


//    private ReportStatus reportStatus;
//    private boolean isResolved;
//    private LocalDateTime resolvedAt;
}

