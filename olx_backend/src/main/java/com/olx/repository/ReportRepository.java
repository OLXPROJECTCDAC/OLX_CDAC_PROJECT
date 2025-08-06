package com.olx.repository;

import com.olx.Enum.ReportStatus;
import com.olx.entity.ReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<ReportEntity, Long> {

    List<ReportEntity> findByReportStatus(ReportStatus reportStatus);

}
