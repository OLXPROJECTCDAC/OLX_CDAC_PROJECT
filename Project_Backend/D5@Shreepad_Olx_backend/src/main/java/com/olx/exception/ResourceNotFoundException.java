package com.olx.exception;

@SuppressWarnings("serial")
public class ResourceNotFoundException extends RuntimeException{
	public ResourceNotFoundException(String errorMessage) {
		super(errorMessage);
	}

}
