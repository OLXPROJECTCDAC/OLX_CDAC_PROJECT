package com.olx.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

//DTO - to send Response from REST server -> REST client
@Getter
@Setter
public class ApiResponseDTO {

	@JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
	private LocalDateTime timeStamp; // When this response is created
	private String message; // Message for the client

	public ApiResponseDTO(String message) {
		this.message = message;
		this.timeStamp = LocalDateTime.now();
	}
}
