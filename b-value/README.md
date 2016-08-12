## b-value

Demonstrates how streams can depend on one another to keep values consistent.

### Usage

```
npm install
npm start    # Builds the demo and hosts it on port 3000.
```

### Things to Try

1. The example initially uses the `xs.periodic()` stream increment `a` once-per-second.
Change it to use a slider instead as input (see source code for example of how to do this).
2. Instead of multiplying the value of `b` by 5, change the expression to a different calculation, like
squaring `a`.
3. Use two input streams together to calculate `b`. For instance, create two range sliders, and have `b`
represent the two values added together.
