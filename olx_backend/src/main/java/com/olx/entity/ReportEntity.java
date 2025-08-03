package com.olx.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import com.olx.Enum.ReportStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "reports")
@Getter
@Setter
@ToString
public class ReportEntity extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private ProductsEntity product;

    @Enumerated(EnumType.STRING)
    @Column(name = "report_status", nullable = false)
    private ReportStatus reportStatus;

    @Column(name = "complaint_text", columnDefinition = "TEXT", nullable = false)
    private String complaintText;

    @Column(name = "is_resolved", nullable = false)
    private Boolean isResolved = false;

    @Column(name = "resolved_at")
    private LocalDate resolvedAt;

    @Column(name = "report_time", nullable = false)
    private LocalTime reportTime;
}
