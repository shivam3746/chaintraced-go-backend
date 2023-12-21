package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type Message struct {
	ID     int    `json:"id"`
	Text   string `json:"text"`
	Author string `json:"author"`
}

var messages []Message

func main() {
	// Populating test messages
	messages = []Message{
		{ID: 1, Text: "Hello, World!", Author: "John Doe"},
		{ID: 2, Text: "Testing the API", Author: "Jane Smith"},
		{ID: 3, Text: "Golang is awesome!", Author: "Alice"},
	}

	r := mux.NewRouter()

	r.HandleFunc("/messages", getMessages).Methods("GET")
	r.HandleFunc("/messages", postMessage).Methods("POST")
	r.HandleFunc("/messages/{id}/reply", replyToMessage).Methods("POST")
	r.HandleFunc("/messages/{id}", deleteMessage).Methods("DELETE")
	r.HandleFunc("/messages/{id}", editMessage).Methods("PUT")

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"},
		AllowedMethods: []string{"GET", "POST", "DELETE", "PUT"},
	})

	corsHandler := c.Handler(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server listening on :%s", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), corsHandler))
}

// Get all messages
func getMessages(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(messages)
}

// Create a Message
func postMessage(w http.ResponseWriter, r *http.Request) {
	var message Message
	if err := json.NewDecoder(r.Body).Decode(&message); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	message.ID = len(messages) + 1
	messages = append(messages, message)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(message)
}

// Removing a message
func deleteMessage(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	for i, msg := range messages {
		if fmt.Sprintf("%d", msg.ID) == id {
			// Removing the message from the slice
			messages = append(messages[:i], messages[i+1:]...)
			w.WriteHeader(http.StatusNoContent)
			return
		}
	}

	http.NotFound(w, r)
}

// Replying to a message
func replyToMessage(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var reply Message
	if err := json.NewDecoder(r.Body).Decode(&reply); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	//Original message check
	var originalMessage Message
	found := false
	for _, msg := range messages {
		if fmt.Sprintf("%d", msg.ID) == id {
			originalMessage = msg
			found = true
			break
		}
	}

	if !found {
		http.NotFound(w, r)
		return
	}

	// Assigning a new ID and the original message with the reply
	reply.ID = len(messages) + 1
	reply.Author = "Replier" //Currently static
	messages = append(messages, reply)

	if originalMessage.Author == "ImportantAuthor" {
		reply.Text = "This is an important reply!"
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(reply)
}

// Editing a message
func editMessage(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	var updatedMessage Message
	if err := json.NewDecoder(r.Body).Decode(&updatedMessage); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	//ID Check
	for i, msg := range messages {
		if fmt.Sprintf("%d", msg.ID) == id {
			// Updating existing message
			messages[i].Text = updatedMessage.Text
			messages[i].Author = updatedMessage.Author

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(messages[i])
			return
		}
	}

	http.NotFound(w, r)
}
