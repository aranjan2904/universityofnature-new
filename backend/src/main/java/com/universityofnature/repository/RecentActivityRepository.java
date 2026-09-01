package com.universityofnature.repository;

import com.universityofnature.entity.RecentActivity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecentActivityRepository extends JpaRepository<RecentActivity, Long> {
    List<RecentActivity> findByEnabledOrderByDisplayOrderAsc(Boolean enabled);
}
