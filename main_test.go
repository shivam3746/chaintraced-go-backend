package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"
)

func TestGetMessages(t *testing.T) {
	req, err := http.NewRequest("GET", "/messages", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(getMessages)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	expected := `[{"id":1,"text":"Hello, World!","author":"John Doe"},{"id":2,"text":"Testing the API","author":"Jane Smith"},{"id":3,"text":"Golang is awesome!","author":"Alice"}]`
	if rr.Body.String() != expected {
		t.Errorf("Handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}

func TestPostMessage(t *testing.T) {
	message := Message{Text: "New Message", Author: "TestAuthor"}

	jsonStr, _ := json.Marshal(message)
	req, err := http.NewRequest("POST", "/messages", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(postMessage)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	var responseMessage Message
	err = json.Unmarshal(rr.Body.Bytes(), &responseMessage)
	if err != nil {
		t.Fatal(err)
	}

	if responseMessage.Text != message.Text || responseMessage.Author != message.Author {
		t.Errorf("Handler returned unexpected message: got %v want %v", responseMessage, message)
	}
}

func TestDeleteMessage(t *testing.T) {
	req, err := http.NewRequest("DELETE", "/messages/2", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	router := mux.NewRouter()
	router.HandleFunc("/messages/{id}", deleteMessage).Methods("DELETE")
	router.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusNoContent {
		t.Errorf("Handler returned wrong status code: got %v want %v", status, http.StatusNoContent)
	}

	// Verifying that message with ID 2 is deleted
	req, err = http.NewRequest("GET", "/messages", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr = httptest.NewRecorder()
	router.HandleFunc("/messages", getMessages).Methods("GET")
	router.ServeHTTP(rr, req)

	expected := `[{"id":1,"text":"Hello, World!","author":"John Doe"},{"id":3,"text":"Golang is awesome!","author":"Alice"}]`
	if rr.Body.String() != expected {
		t.Errorf("Handler returned unexpected body after delete: got %v want %v", rr.Body.String(), expected)
	}
}

func TestReplyToMessage(t *testing.T) {
	// Assuming there is a message with ID 1 to reply to
	reply := Message{Text: "Reply to Message", Author: "TestReplier"}

	jsonStr, _ := json.Marshal(reply)
	req, err := http.NewRequest("POST", "/messages/1/reply", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	router := mux.NewRouter()
	router.HandleFunc("/messages/{id}/reply", replyToMessage).Methods("POST")
	router.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	var responseMessage Message
	err = json.Unmarshal(rr.Body.Bytes(), &responseMessage)
	if err != nil {
		t.Fatal(err)
	}

	// Verifying for correct text and author
	expectedText := "This is an important reply!"
	if responseMessage.Text != expectedText {
		t.Errorf("Handler returned unexpected reply text: got %v want %v", responseMessage.Text, expectedText)
	}
}

func TestEditMessage(t *testing.T) {
	// Assuming there is a message with ID 1 to edit
	updatedMessage := Message{Text: "Updated Message", Author: "UpdatedAuthor"}

	jsonStr, _ := json.Marshal(updatedMessage)
	req, err := http.NewRequest("PUT", "/messages/1", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	router := mux.NewRouter()
	router.HandleFunc("/messages/{id}", editMessage).Methods("PUT")
	router.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	var responseMessage Message
	err = json.Unmarshal(rr.Body.Bytes(), &responseMessage)
	if err != nil {
		t.Fatal(err)
	}

	// Verifying message updation
	if responseMessage.Text != updatedMessage.Text || responseMessage.Author != updatedMessage.Author {
		t.Errorf("Handler returned unexpected updated message: got %v want %v", responseMessage, updatedMessage)
	}
}
