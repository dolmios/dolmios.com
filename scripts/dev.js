#!/usr/bin/env node

const { spawn } = require('child_process');
const net = require('net');
const { resolve } = require('path');

function checkPort(port): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.listen(port, () => {
      server.once('close', () => resolve(true));
      server.close();
    });

    server.on('error', () => resolve(false));
  });
}

async function startDev(): Promise<void> {
  console.log('⚡️ Fetching device IP for development...');

  // Get IP address
  const { execSync } = require('child_process');

  try {
    const ip = execSync('ipconfig getifaddr en0', { encoding: 'utf-8' }).trim();

    console.log(ip);
  } catch {
    console.log('Could not fetch IP address');
  }
  console.log('🫡');

  // Check ports
  const port420Available = await checkPort(420);
  const port = port420Available ? 420 : 421;

  if (!port420Available) {
    console.log(`Port 420 is in use, using port ${port} instead`);
  }

  // Get the project root directory (where this script is located)
  const projectRoot = resolve(__dirname, '..');
  const nextBin = resolve(projectRoot, 'node_modules', '.bin', 'next');

  // Start Next.js
  const nextProcess = spawn(nextBin, ['dev', '--turbopack', '-p', port.toString()], {
    cwd: projectRoot,
    env: { ...process.env },
    stdio: 'inherit',
  });

  nextProcess.on('error', (error) => {
    console.error('Failed to start Next.js:', error);
    process.exit(1);
  });

  nextProcess.on('exit', (code) => {
    process.exit(code || 0);
  });
}

startDev();
