const express = require('express');
const path = require('path');
const fs = require("fs");

const imageAccessLogs = [];

const getImage = (req,res) => {
    const imageName = req.params.imageName;
    const clientIP = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');
    const referrer = req.get('Referrer');
    const timestamp = new Date().toLocaleString();

    imageAccessLogs.push({
        imageName,
        clientIP,
        userAgent,
        referrer,
        timestamp
    });
    

    const imagePath = path.join(__dirname, '../public/images', imageName);
    res.sendFile(imagePath);
};

const getLogs = (req, res) => {
    res.json(imageAccessLogs);
};

module.exports = {getLogs, getImage};