package com.olx.exception;

import com.olx.dto.ApiResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
// to tell SC - spring bean containing exc handling advice meant for Rest Controllers
public class GlobalExceptionHandler  {
//    public GlobalExceptionHandler(String message) {
//        super(message);
//    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException
            (ResourceNotFoundException e) {
        System.out.println("in catch - res not found...");
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponseDTO(e.getMessage()));
    }
}
