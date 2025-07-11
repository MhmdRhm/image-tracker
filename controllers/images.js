const express = require('express');
const path = require('path');
const fs = require("fs");

const imageAccessLogs = [];

const getImage = (req,res) => {
    const imageName = req.params.imageName;
    const clientIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
    const userAgent = req.get('User-Agent');
    const referrer = req.get('Referrer');
    const utcDate = new Date();
    const timestamp = new Date(utcDate.getTime() + (3.5 * 60 * 60 * 1000));


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