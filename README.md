WM Classified
---

A marketplace for swapping classes among students.

You can post a class you are registered for that you are willing to give up or a class that you need (but can't get into).

*The goal here is not to facilitate a course registration black market dominated by upperclassmen but if I @kelvinabrokwa ends up being the warlord in this system, so be it.*

### Stack

The frontend is built with [React.js](https://facebook.github.io/react/) with a [Redux Architecture](http://redux.js.org/) using [Immutable.js](https://facebook.github.io/immutable-js/) data structures.

The [backend](https://github.com/wm-classified/backend) is an [Node.js](https://nodejs.org/en/) server powered by [Express.js](http://expressjs.com/) running on [Amazon EC2](aws.amazon.com/ec2).

Course catalog data is scraped from the [W&M Open Course List](https://courselist.wm.edu/courselist/).

### Developing

```
git clone https://github.com/course-market/course-market.github.io.git
cd course-market.github.io.git
npm install
npm start
```

To build for production, run
```
npm run build
```
