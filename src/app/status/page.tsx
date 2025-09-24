'use client';

import {useEffect, useState, useMemo} from 'react';

interface Server {
    ip: string;
    name: string;
}

interface ServerPingStatus {
    ip: string;
    delay: number | null; // null indicates a failed ping
    isOnline: boolean;
}

const SERVERS: Server[] = [
    {ip: 'kotleni.pp.ua', name: 'Home Lab 1'},
    {ip: 'dux2.kotleni.pp.ua', name: 'Frankfurt 1'},
    {ip: 'kotleni.github.io', name: 'Github Pages'},
];

/**
 * Pings a web server to measure latency.
 *
 * @param url The URL to ping.
 * @param timeout The timeout in milliseconds.
 * @returns A promise that resolves with the latency in milliseconds, or null if the ping fails or times out.
 */
async function pingWebServer(
    url: string,
    timeout = 5000,
): Promise<number | null> {
    const controller = new AbortController();
    const {signal} = controller;

    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const startTime = performance.now();
    try {
        const response = await fetch(url, {
            method: 'HEAD', // Use HEAD for a lightweight request
            mode: 'no-cors',
            signal,
        });
        const endTime = performance.now();
        return endTime - startTime;
    } catch (error) {
        // Network errors or aborts will be caught here
        return null;
    } finally {
        clearTimeout(timeoutId);
    }
}

/**
 * Fetches the status of all servers concurrently.
 *
 * @returns A promise that resolves with an array of server ping statuses.
 */
async function fetchAllPings(): Promise<ServerPingStatus[]> {
    const pingPromises = SERVERS.map(async server => {
        const delay = await pingWebServer(`http://${server.ip}`);
        return {
            ip: server.ip,
            delay,
            isOnline: delay !== null,
        };
    });

    return Promise.all(pingPromises);
}

function useServerPings(refreshInterval: number) {
    const [statuses, setStatuses] = useState<Record<string, ServerPingStatus>>(
        {},
    );
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAndUpdate = async () => {
            setIsLoading(true);
            const pings = await fetchAllPings();
            const newStatuses = pings.reduce(
                (acc, status) => {
                    acc[status.ip] = status;
                    return acc;
                },
                {} as Record<string, ServerPingStatus>,
            );
            setStatuses(newStatuses);
            setIsLoading(false);
        };

        fetchAndUpdate();

        const intervalId = setInterval(fetchAndUpdate, refreshInterval);
        return () => clearInterval(intervalId);
    }, [refreshInterval]);

    return {statuses, isLoading};
}

function ServerStatus({
    server,
    status,
    isLoading,
}: {
    server: Server;
    status?: ServerPingStatus;
    isLoading: boolean;
}) {
    const statusText = useMemo(() => {
        if (isLoading) return 'Pinging...';
        if (!status || !status.isOnline)
            return <span className="text-red-500">DOWN</span>;
        return <span className="text-green-500">ONLINE</span>;
    }, [isLoading, status]);

    const delayText = useMemo(() => {
        if (isLoading || !status || !status.isOnline) return null;
        return `- ${status.delay?.toFixed(2)} ms`;
    }, [isLoading, status]);

    return (
        <div className="p-2 border rounded-sm shadow-sm flex justify-between items-center">
            <div>
                <span className="font-bold">{server.name}</span>
                <span className="text-gray-500 ml-2">({server.ip})</span>
            </div>
            <div>
                {statusText} {delayText}
            </div>
        </div>
    );
}

export default function StatusPage() {
    const {statuses, isLoading} = useServerPings(10000);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Server Status</h1>
            <div className="flex flex-col gap-4">
                {SERVERS.map(server => (
                    <ServerStatus
                        key={server.ip}
                        server={server}
                        status={statuses[server.ip]}
                        isLoading={isLoading && !statuses[server.ip]}
                    />
                ))}
            </div>
        </div>
    );
}
