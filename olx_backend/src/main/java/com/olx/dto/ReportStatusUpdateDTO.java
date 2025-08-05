package com.olx.dto;

import com.olx.Enum.ReportCategory;
import com.olx.Enum.ReportStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ReportStatusUpdateDTO extends BaseDTO {

    private ReportStatus reportStatus;
    private LocalDateTime resolvedAt;
    }



