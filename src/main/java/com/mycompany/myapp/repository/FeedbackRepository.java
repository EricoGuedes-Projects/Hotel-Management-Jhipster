package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Feedback;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Feedback entity.
 */
@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    @Query("select feedback from Feedback feedback where feedback.user.login = ?#{authentication.name}")
    List<Feedback> findByUserIsCurrentUser();

    default Optional<Feedback> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Feedback> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Feedback> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select feedback from Feedback feedback left join fetch feedback.user left join fetch feedback.reservation",
        countQuery = "select count(feedback) from Feedback feedback"
    )
    Page<Feedback> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select feedback from Feedback feedback left join fetch feedback.reservation left join fetch feedback.user where feedback.user.login = ?#{authentication.name}"
    )
    List<Feedback> findAllWithToOneRelationships();

    @Query(
        "select feedback from Feedback feedback left join fetch feedback.user left join fetch feedback.reservation where feedback.id =:id"
    )
    Optional<Feedback> findOneWithToOneRelationships(@Param("id") Long id);
}
