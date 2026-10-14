
package job_tracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import job_tracker.model.ApplicationStatus;
import job_tracker.model.JobApplication;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByStatus(ApplicationStatus status);
}