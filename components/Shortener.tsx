"use client";

import { useState } from "react";
import styled from "styled-components";
import { TextField, Button } from "@mui/material";

const PageWrapper = styled.div`
    background-color: #e6f2ff; /* light blue */
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 32px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 32px;
    border-radius: 12px;
    background: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    max-width: 90vw;
    width: 500px;
`;

const SectionTitle = styled.h1`
    margin-top: 16px;
    font-size: 16px;
`;

const ErrorMessage = styled.div`
    margin-top: 8px;
    color: red;
    font-size: 14px;
    text-align: center;
`;

const SuccessMessage = styled.div`
    margin-top: 16px;
    color: green;
    font-size: 20px;
    text-align: center;
`;

export default function Shortener() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 10000);
    };

    const handleShortenUrl = async () => {
        setShortUrl("");
        setError("");
        setCopied(false);

        if (!url) {
            setError("Please enter a URL.");
            return;
        }

        try {
            const res = await fetch("/api/url", {
                method: "POST",
                body: JSON.stringify({ url, alias }),
            });
            const data = await res.json();
            if (res.ok) {
                setShortUrl(data.shortUrl);
            } else {
                setError(data.error || "Failed to shorten URL.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <PageWrapper>
            <Container>
                <SectionTitle>Enter a long URL!</SectionTitle>
                <TextField
                    variant="outlined"
                    placeholder="https://example.com/very/long/url"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    size="small"
                    fullWidth
                />

                <SectionTitle>Enter a keyword or shortcut!</SectionTitle>
                <TextField
                    variant="outlined"
                    placeholder="your-shortcut"
                    value={alias}
                    onChange={e => setAlias(e.target.value)}
                    size="small"
                    fullWidth
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleShortenUrl}
                    style={{ borderRadius: '8px' }}
                >
                    Shorten
                </Button>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                {shortUrl && (
                    <SuccessMessage>
                        <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                            {shortUrl}
                        </a>
                        <Button
                            size="small"
                            onClick={handleCopy}
                            color={copied ? "success" : "primary"}
                            variant="text"
                            style={{ marginLeft: '0.5rem' }}
                        >
                            {copied ? "Copied!" : "Copy"}
                        </Button>
                    </SuccessMessage>
                )}
            </Container>
        </PageWrapper>
    );
}