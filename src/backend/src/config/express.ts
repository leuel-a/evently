import Express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import './passport';

const express = Express();

express.use(morgan('dev'));
express.use(passport.initialize()); // Initialize passport middleware
express.use(Express.json());

export default express;
