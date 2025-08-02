package com.olx.entity;

	import jakarta.persistence.*;
	import lombok.*;

	import java.time.LocalDate;
	import java.time.LocalDateTime;

import com.olx.Enum.PackageType;

	@Entity
	@Table(name = "packages")
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public class PackageEntity {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "package_id")
	    private Integer packageId;

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "user_id", nullable = false)
	    private UserEntity user;

	    @Column(name = "still_active", nullable = false)
	    private boolean stillActive = true;

	    @Enumerated(EnumType.STRING)
	    @Column(name = "package_type", nullable = false)
	    private PackageType packageType;

	    @Column(name = "start_date", nullable = false)
	    private LocalDate startDate;

	    @Column(name = "end_date", nullable = false)
	    private LocalDate endDate;

	    @Column(name = "created_at", nullable = false, updatable = false)
	    private LocalDateTime createdAt;

	    @Column(name = "updated_at", nullable = false)
	    private LocalDateTime updatedAt;

	    @PrePersist
	    protected void onCreate() {
	        this.createdAt = this.updatedAt = LocalDateTime.now();
	    }

	    @PreUpdate
	    protected void onUpdate() {
	        this.updatedAt = LocalDateTime.now();
	    }
	}
}
