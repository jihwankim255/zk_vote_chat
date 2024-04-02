// The 'mafia_chat15551' program.
program mafia_chat15551.aleo {
    transition main(public a: u32, b: u32) -> u32 {
        let c: u32 = a + b;
        return c;
    }
}
