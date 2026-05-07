type TeamMemberProps = {
  name: string;
  github: string;
};

export default function TeamMember({ name, github }: TeamMemberProps) {
  return (
    <div style={styles.card}>
      <p style={styles.name}>{name}</p>
      <a href={github} target="_blank" rel="noopener noreferrer">
        Ver GitHub
      </a>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: "1px solid #ddd",
    padding: "1rem",
    borderRadius: "8px",
    textAlign: "center",
  },
  name: {
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
};