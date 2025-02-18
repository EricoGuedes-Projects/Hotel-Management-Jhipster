package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Feedback;
import com.mycompany.myapp.domain.Reservation;
import com.mycompany.myapp.repository.FeedbackRepository;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Feedback}.
 */
@RestController
@RequestMapping("/api/feedbacks")
@Transactional
public class FeedbackResource {

    private static final Logger LOG = LoggerFactory.getLogger(FeedbackResource.class);

    private static final String ENTITY_NAME = "feedback";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FeedbackRepository feedbackRepository;

    public FeedbackResource(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    /**
     * {@code POST  /feedbacks} : Create a new feedback.
     *
     * @param feedback the feedback to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new feedback, or with status {@code 400 (Bad Request)} if the feedback has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Feedback> createFeedback(@Valid @RequestBody Feedback feedback) throws URISyntaxException {
        LOG.debug("REST request to save Feedback : {}", feedback);
        if (feedback.getId() != null) {
            throw new BadRequestAlertException("A new feedback cannot already have an ID", ENTITY_NAME, "idexists");
        }
        feedback = feedbackRepository.save(feedback);
        return ResponseEntity.created(new URI("/api/feedbacks/" + feedback.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, feedback.getId().toString()))
            .body(feedback);
    }

    /**
     * {@code PUT  /feedbacks/:id} : Updates an existing feedback.
     *
     * @param id the id of the feedback to save.
     * @param feedback the feedback to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated feedback,
     * or with status {@code 400 (Bad Request)} if the feedback is not valid,
     * or with status {@code 500 (Internal Server Error)} if the feedback couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Feedback> updateFeedback(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Feedback feedback
    ) throws URISyntaxException {
        LOG.debug("REST request to update Feedback : {}, {}", id, feedback);
        if (feedback.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, feedback.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!feedbackRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        feedback = feedbackRepository.save(feedback);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, feedback.getId().toString()))
            .body(feedback);
    }

    /**
     * {@code PATCH  /feedbacks/:id} : Partial updates given fields of an existing feedback, field will ignore if it is null
     *
     * @param id the id of the feedback to save.
     * @param feedback the feedback to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated feedback,
     * or with status {@code 400 (Bad Request)} if the feedback is not valid,
     * or with status {@code 404 (Not Found)} if the feedback is not found,
     * or with status {@code 500 (Internal Server Error)} if the feedback couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Feedback> partialUpdateFeedback(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Feedback feedback
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Feedback partially : {}, {}", id, feedback);
        if (feedback.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, feedback.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!feedbackRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Feedback> result = feedbackRepository
            .findById(feedback.getId())
            .map(existingFeedback -> {
                if (feedback.getFeedbackDate() != null) {
                    existingFeedback.setFeedbackDate(feedback.getFeedbackDate());
                }
                if (feedback.getRating() != null) {
                    existingFeedback.setRating(feedback.getRating());
                }
                if (feedback.getComments() != null) {
                    existingFeedback.setComments(feedback.getComments());
                }

                return existingFeedback;
            })
            .map(feedbackRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, feedback.getId().toString())
        );
    }

    /**
     * {@code GET  /feedbacks} : get all the feedbacks.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of feedbacks in body.
     */
    @GetMapping("")
    public List<Feedback> getAllFeedbacks(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        LOG.debug("REST request to get a page of Feedbacks");
        if (eagerload) {
            return feedbackRepository.findAllWithEagerRelationships();
        } else {
            return feedbackRepository.findByUserIsCurrentUser();
        }
    }

    /**
     * {@code GET  /feedbacks/:id} : get the "id" feedback.
     *
     * @param id the id of the feedback to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the feedback, or with status {@code 404 (Not Found)}.
     */

    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getFeedback(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Reservation : {}", id);

        // Obtém o usuário autenticado
        String currentUserLogin = SecurityUtils.getCurrentUserLogin()
            .orElseThrow(() -> new IllegalStateException("Usuário não autenticado"));

        // Busca a reserva com as relações carregadas e verifica o usuário
        Optional<Feedback> feedback = feedbackRepository
            .findOneWithEagerRelationships(id)
            .filter(res -> res.getUser() != null && res.getUser().getLogin().equals(currentUserLogin));

        return ResponseUtil.wrapOrNotFound(feedback);
    }

    /**
     * {@code DELETE  /feedbacks/:id} : delete the "id" feedback.
     *
     * @param id the id of the feedback to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Feedback : {}", id);
        feedbackRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
