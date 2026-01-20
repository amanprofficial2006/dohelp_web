# Chat Component Fixes - Additional Issues

- [x] Add API_BASE constant for backend URL
- [x] Replace all fetch("/api/...") with fetch(`${API_BASE}/...`)
- [x] Confirm receiver_uid is used in conversation request body
- [x] Confirm setConversationId uses data.conversation_id
