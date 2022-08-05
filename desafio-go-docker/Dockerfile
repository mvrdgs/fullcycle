FROM golang:1.18 AS builder

WORKDIR /user/src/app

COPY go.mod ./
RUN go mod download && go mod verify

COPY . .
RUN go build ./main.go

FROM scratch

COPY --from=builder /user/src/app/main .

CMD ["./main"]
