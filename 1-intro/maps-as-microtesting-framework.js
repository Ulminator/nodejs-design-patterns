const tests = new Map();
tests.set(() => 2+2, 4);
tests.set(() => 2*2, 4);
tests.set(() => 2/2, 4);

// Respects ordering when iterating through
for (const entry of tests) {
    console.log((entry[0]() === entry[1]) ? 'PASS' : 'FAIL');
}