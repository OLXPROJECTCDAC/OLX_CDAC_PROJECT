package com.olx.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

import com.olx.Enum.ReportStatus;

@Entity
@Table(name = "report")
@Getter
@Setter
public class ReportEntity extends BaseEntity {

	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id", nullable = false)
	private ProductsEntity product;

	@Enumerated(EnumType.STRING)
	@Column(name = "report_status", nullable = false)
	private ReportStatus reportStatus;

	@Column(name = "complaint_text", columnDefinition = "TEXT", nullable = false)
	private String complaintText;

	@Column(name = "is_resolved", nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0")
	private boolean isResolved = false;

	@Column(name = "resolved_at")
	private LocalDateTime resolvedAt;

// todo: Auto-setting resolvedAt when isResolved becomes true
	public void setIsResolved(boolean resolved) {
		this.isResolved = resolved;
		if (resolved && this.resolvedAt == null) {
			this.resolvedAt = LocalDateTime.now();
		}
	}

}
