type Message = {
  site: string;
  desc: string;
};

const message: Message = {
  site: 'Suomi.fi',
  desc: 'UI components library!'
};

console.log(`${message.site} ${message.desc}`);
