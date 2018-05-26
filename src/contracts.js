export const skilleXAddress = '0xdf65fb76094344ee2ab43e5bb51b244b28abd375';
export const skilleXAbi = [
  {
    constant: false,
    inputs: [
      {
        name: 'offerId',
        type: 'uint256',
      },
      {
        name: 'toErc721',
        type: 'address',
      },
      {
        name: 'toTokenId',
        type: 'uint256',
      },
    ],
    name: 'learn',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getSkillName',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'offerId',
        type: 'uint256',
      },
    ],
    name: 'cancel',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'erc721',
        type: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
      },
      {
        name: 'ipfsHash',
        type: 'string',
      },
    ],
    name: 'hasSkill',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'skillId',
        type: 'uint256',
      },
      {
        name: 'price',
        type: 'uint256',
      },
    ],
    name: 'offerTeach',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getIpfsHash',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'ipfsHash',
        type: 'string',
      },
      {
        name: 'toErc721',
        type: 'address',
      },
      {
        name: 'toTokenId',
        type: 'uint256',
      },
    ],
    name: 'createSkill',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'offerId',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'skillId',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'teacherErc721',
        type: 'address',
      },
      {
        indexed: false,
        name: 'teacherTokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'skillName',
        type: 'string',
      },
      {
        indexed: false,
        name: 'generation',
        type: 'uint256',
      },
    ],
    name: 'OfferCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'offerId',
        type: 'uint256',
      },
    ],
    name: 'OfferDeleted',
    type: 'event',
  },
];
