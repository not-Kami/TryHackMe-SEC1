// Correct answer: 0 = A, 1 = B, 2 = C, 3 = D
// Networking — based on Notes/4.Networking/1.concepts.md (OSI/TCP-IP, addressing, TCP/UDP, ports/sockets, CLI tools)
export const id = 'networking'
export const title = 'Networking'
export const description = 'TryHackMe Networking — OSI/TCP-IP, IP addressing, TCP vs UDP, ports/sockets, and basic troubleshooting commands'

export const questions = [
  // ==== Reference models ====
  {
    type: 'order',
    text: 'Place the OSI model layers in the correct order (top to bottom).',
    items: [
      'Layer Application',
      'Layer Presentation',
      'Layer Session',
      'Layer Transport',
      'Layer Network',
      'Layer Data Link',
      'Layer Physical',
    ],
    correctOrder: [
      'Layer Application',
      'Layer Presentation',
      'Layer Session',
      'Layer Transport',
      'Layer Network',
      'Layer Data Link',
      'Layer Physical',
    ],
    hint: 'OSI goes from Application down to Physical.',
  },
  {
    text: 'On the OSI model, which layer is responsible for end-to-end host communication (commonly associated with TCP/UDP)?',
    options: ['Layer 2 (Data Link)', 'Layer 3 (Network)', 'Layer 4 (Transport)', 'Layer 5 (Session)'],
    correct: 2,
    hint: 'OSI Layer 4 = Transport.',
  },
  {
    text: 'On the OSI model, which layer defines the electrical/mechanical/physical transmission of raw bits over a medium?',
    options: ['Layer 1 (Physical)', 'Layer 2 (Data Link)', 'Layer 3 (Network)', 'Layer 7 (Application)'],
    correct: 0,
    hint: 'Physical layer handles the raw bits.',
  },
  {
    text: 'In the TCP/IP practical model, the “Application” layer consolidates which OSI layers?',
    options: ['OSI 1 and 2', 'OSI 3', 'OSI 4', 'OSI 5, 6, and 7'],
    correct: 3,
    hint: 'TCP/IP groups OSI 5-7 into Application.',
  },
  {
    text: 'Which data unit name is typically used at the Transport layer?',
    options: ['Frames', 'Packets', 'Segments', 'Bits'],
    correct: 2,
    hint: 'Transport data unit = Segments.',
  },

  // ==== IP addressing & subnetting ====
  {
    text: 'IPv4 addresses are how many bits long?',
    options: ['16 bits', '24 bits', '32 bits', '64 bits'],
    correct: 2,
    hint: 'IPv4 = 32-bit.',
  },
  {
    text: 'A MAC address is which length?',
    options: ['32 bits', '48 bits', '64 bits', '128 bits'],
    correct: 1,
    hint: 'MAC addresses are 48-bit identifiers.',
  },
  {
    text: 'What is the subnet mask mainly used for?',
    options: [
      'Encrypting traffic between devices',
      'Distinguishing the Network ID from the Host ID in an IP address',
      'Assigning a router hostname',
      'Measuring latency to a destination',
    ],
    correct: 1,
    hint: 'Subnet mask separates network vs host.',
  },
  {
    text: 'The default gateway is generally best described as the router interface that:',
    options: [
      'Delivers packets directly to the destination host on the same subnet',
      'Connects the local network to other networks',
      'Provides DNS resolution only',
      'Stores the MAC address for your device',
    ],
    correct: 1,
    hint: 'Gateway = “exit” point from the local network.',
  },

  // ==== TCP vs UDP ====
  {
    text: 'Which protocol is connection-oriented and uses a three-way handshake (SYN, SYN-ACK, ACK)?',
    options: ['UDP', 'ICMP', 'TCP', 'ARP'],
    correct: 2,
    hint: 'TCP uses the three-way handshake.',
  },
  {
    text: 'Which statement best describes UDP?',
    options: [
      'It guarantees delivery and retransmits lost packets automatically',
      'It is connectionless and uses best-effort delivery',
      'It always performs DNS queries over a secure tunnel',
      'It requires a handshake before sending data',
    ],
    correct: 1,
    hint: 'UDP does not guarantee delivery (“best effort”).',
  },

  // ==== Ports & sockets ====
  {
    text: 'What is a port number?',
    options: [
      'A physical address of a network card',
      'A 16-bit identifier (0-65535) used to direct traffic to a service on a host',
      'A device serial number burned into firmware',
      'A routing table entry',
    ],
    correct: 1,
    hint: 'Ports identify services on a host.',
  },
  {
    text: 'What is a socket in networking terms?',
    options: [
      'A physical cable type',
      'An IP address by itself',
      'An IP address combined with a port number (e.g., 10.10.10.5:443)',
      'A DNS record type',
    ],
    correct: 2,
    hint: 'Socket = IP + Port.',
  },

  // ==== Troubleshooting CLI tools ====
  {
    text: 'What does `ping` typically check?',
    options: [
      'Whether a specific TCP port is open',
      'Whether a host is reachable using ICMP Echo and measures latency',
      'Whether a DNS record exists only',
      'The current routing table',
    ],
    correct: 1,
    hint: 'ping uses ICMP echo requests.',
  },
  {
    text: 'In Windows, which command is the equivalent of Linux `traceroute`?',
    options: ['trace', 'track', 'tracert', 'tracepath'],
    correct: 2,
    hint: 'tracert = traceroute on Windows.',
  },
  {
    text: 'What is the main purpose of `tracert <host>`?',
    options: [
      'Recursively list directories on the network',
      'Show the hop-by-hop path packets take to reach the destination',
      'Change the IP configuration',
      'Encrypt the traffic using TLS',
    ],
    correct: 1,
    hint: 'tracert maps the path (routers/hops).',
  },
  {
    text: 'In modern usage, `telnet <ip> <port>` is often used to test if a specific TCP port is:',
    options: ['Always closed', 'Open and accepting connections', 'Guaranteed to be encrypted', 'Configured in the routing table'],
    correct: 1,
    hint: 'Telnet can establish a TCP connection to test port reachability.',
  },

  // ==== Essentials (DHCP, ARP, NAT, ICMP, domains) ====
  {
    text: 'In DHCP (DORA), which step is when the client broadcasts to find a DHCP server?',
    options: ['Offer', 'Discovery', 'Request', 'Acknowledgment'],
    correct: 1,
    hint: 'Discovery = client broadcast to find a DHCP server.',
  },
  {
    text: 'In DHCP (DORA), what does the server send during the “Offer” step?',
    options: [
      'An IP lease confirmation with TTL',
      'A proposed network configuration (IP, subnet mask, gateway, DNS)',
      'Only the MAC address of the client',
      'A list of all available DHCP servers',
    ],
    correct: 1,
    hint: 'Offer proposes the configuration details.',
  },
  {
    text: 'ARP is mainly used to resolve:',
    options: ['MAC -> IP', 'IP -> MAC', 'Port -> Protocol', 'DNS -> URL'],
    correct: 1,
    hint: 'ARP resolves the destination MAC address from an IP on a local network.',
  },
  {
    text: 'What is ARP poisoning typically used for by an attacker?',
    options: [
      'Guaranteeing encryption for all traffic',
      'Intercepting traffic via Man-in-the-Middle using fake ARP replies',
      'Speeding up DNS resolution',
      'Changing the default gateway permanently',
    ],
    correct: 1,
    hint: 'Fake ARP replies can redirect traffic (MITM).',
  },
  {
    text: 'What is the main purpose of NAT?',
    options: [
      'Route private IP ranges directly to the Internet',
      'Conserve public IPv4 addresses by sharing one public IP',
      'Replace DNS with ARP',
      'Encrypt user data at the network layer',
    ],
    correct: 1,
    hint: 'NAT lets a private network share a single public IP.',
  },
  {
    text: 'In NAT, the translation table maps:',
    options: [
      'Internal IP/port -> external IP/port',
      'External IP/port -> internal IP/port only',
      'MAC -> IP addresses',
      'Device hostname -> IP address',
    ],
    correct: 0,
    hint: 'NAT tracks internal endpoints and their corresponding external endpoints.',
  },
  {
    text: 'Compared to TCP/UDP, ICMP is primarily used for:',
    options: [
      'Transporting user application data',
      'Control and error/diagnostic messages',
      'Managing TCP sessions and retransmissions',
      'Encrypting packets using TLS',
    ],
    correct: 1,
    hint: 'ICMP is for control/errors/diagnostics (e.g., ping, traceroute).',
  },
  {
    text: 'In basic diagnostics, what does `ping` use to test reachability?',
    options: [
      'ICMP Echo Request / Echo Reply',
      'TCP SYN / SYN-ACK only',
      'ARP requests',
      'DHCP broadcasts',
    ],
    correct: 0,
    hint: 'Ping relies on ICMP Echo messages.',
  },
  {
    text: 'In traceroute, which IP field is used to identify hops along the path?',
    options: ['The IP TTL (Time To Live) field', 'The IP checksum', 'The MAC address field', 'The TCP window size'],
    correct: 0,
    hint: 'Traceroute decrements TTL until it reaches 0.',
  },
  {
    text: 'Which statement is correct about network domains?',
    options: [
      'Collision domains are bounded by routers; broadcast domains are bounded by switches',
      'Collision domains are bounded by switches; broadcast domains are bounded by routers',
      'Both collision and broadcast domains are bounded by switches',
      'Both collision and broadcast domains are bounded by routers',
    ],
    correct: 1,
    hint: 'Switches limit collisions; routers limit broadcasts.',
  },
]

