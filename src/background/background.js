//const supabase_Project_Password = "SzPa0vo2409siPc3";

const SUPABASE_URL = "https://zfkjqjkngtitltsrjcnb.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpma2pxamtuZ3RpdGx0c3JqY25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MDUyNjEsImV4cCI6MjA3NTk4MTI2MX0.m43llp6m26CSOzb0n3bcBq5W2hIxX3eXRKwuMfhxrTs";
const SUPABASE_TABLE = "Profiles";

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);
})